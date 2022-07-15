import { useState } from 'react';
import EmbedResult from '../../components/EmbedResult/EmbedResult';
import LinkInput from '../../components/LinkInput/LinkInput';
import MainLayout from '../../layouts/MainLayout/MainLayout';

function HomePage() {
  const [embed, setEmbed] = useState<string | null>(null);

  const onEmbedResult = (embedResult: string | null) => {
    if (embedResult !== null) {
      navigator.clipboard.writeText(embedResult);
    }
    setEmbed(embedResult);
  };

  return (
    <MainLayout title="Dan's Youtube Embedder">
      <LinkInput onEmbedResults={onEmbedResult} />
      <EmbedResult embed={embed} />
    </MainLayout>
  );
}

export default HomePage;
