import { useRef, useState } from 'react';

interface LinkInputProps {
  onEmbedResults: (embed: string | null) => void;
}

const raw = `
<iframe
  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
  src="https://www.youtube.com/embed/{REPLACE}&autoplay=1"
  srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/{REPLACE}?autoplay=1><img src=https://img.youtube.com/vi/{REPLACE}/hqdefault.jpg><span>▶</span></a>"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>`;

function LinkInput(props: LinkInputProps) {
  const { onEmbedResults } = props;

  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const getHash = (urlString: string): string => {
    const url = new URL(urlString);
    const vHash = url.searchParams.get('v');

    if (vHash !== null) {
      return vHash;
    }

    const pathHash = url.pathname.split('/').pop();

    if (pathHash === undefined) {
      throw new Error('No video hash found');
    }
    return pathHash;
  };

  const getEmbed = (hash: string): string => raw.replaceAll('{REPLACE}', hash);

  const onGenerateClick = () => {
    if (input.current === null) {
      return;
    }

    try {
      const hash = getHash(input.current.value);
      const embed = getEmbed(hash);
      onEmbedResults(embed);
      setError(null);
    } catch (err) {
      onEmbedResults(null);
      setError('Invalid URL');
    }
  };

  const onGenerateFromClipBoardClick = async () => {
    const clip = await navigator.clipboard.readText();
    if (input.current) {
      input.current.value = clip;
    }
    onGenerateClick();
  };

  const errorDisplay = error !== null ? (
    <label
      className="flex bg-red-200 rounded-lg mr-2 pl-4 pr-4 items-center"
      htmlFor="link-input"
    >
      { error }
    </label>
  ) : null;

  return (
    <div className="flex m-5">
      { errorDisplay }
      <input
        id="link-input"
        type="url"
        placeholder="Place your URL here"
        ref={input}
        className="grow background-gray-100 border-2 border-gray-200 rounded-lg p-2"
      />
      <input
        type="button"
        onClick={onGenerateClick}
        className="bg-orange-100 hover:bg-orange-200 rounded-lg p-2 ml-2"
        value="Generate"
      />
      <input
        type="button"
        onClick={onGenerateFromClipBoardClick}
        className="bg-orange-100 hover:bg-orange-200 rounded-lg p-2 ml-2"
        value="Generate from Clipboard"
      />
    </div>
  );
}

export default LinkInput;
