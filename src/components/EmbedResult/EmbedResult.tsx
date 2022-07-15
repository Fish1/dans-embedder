interface EmbedResultProps {
  embed: string | null;
}

function EmbedResult(props: EmbedResultProps) {
  const { embed } = props;

  const display = embed !== null ? (
    <div className="ml-4 mr-4">
      <h2 className="flex justify-center text-xl text-gray-700">
        Embed Code
      </h2>
      <code
        className="inline-block border-2 p-4 rounded-md break-all"
      >
        { embed }
      </code>
    </div>
  ) : null;

  return display;
}

export default EmbedResult;
