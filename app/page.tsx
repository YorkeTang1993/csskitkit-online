import type { Metadata } from 'next';
import { tools, categories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Free Online CSS Tools`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: `${SITE_NAME} - Free Online CSS Tools`,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    type: 'website',
  },
};

function generateHomepageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} - Free Online Tools`,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE_URL}/${tool.slug}`,
        name: tool.name,
      })),
    },
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHomepageJsonLd()),
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Free Online CSS Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fast, free, and privacy-friendly CSS tools that work right in your browser. No signup, no data collection.
          </p>
        </div>

        <section className="mb-12 text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
          <p>
            CSSKit is a collection of free browser-based CSS tools built for web developers and designers.
            From gradient generators and grid builders to shadow editors and animation creators — every tool
            runs entirely in your browser with live preview and instant code copying.
          </p>
          <p className="mt-3">
            Whether you need to create CSS gradients, build flexbox layouts, generate clip-path shapes,
            or design box shadows, our visual tools make CSS development faster and easier with no signup required.
          </p>
        </section>

        {categories.map(cat => {
          const catTools = tools.filter(t => t.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{cat.label}</h2>
              <p className="text-gray-500 mb-4">{cat.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
