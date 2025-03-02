export function TypographyShowcase() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="heading-2-bold mb-8">BeVietnamPro Typography System</h1>

      {/* Text Styles */}
      <section className="mb-12">
        <h2 className="heading-3-bold mb-4 border-b pb-2">Text Styles</h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="heading-4-semibold mb-4">Text XS (10px)</h3>
            <p className="text-xs-regular mb-1">Text-XS/regular (10px/14px)</p>
            <p className="text-xs-medium mb-6">Text-XS/medium (10px/14px)</p>

            <h3 className="heading-4-semibold mb-4">Text S (12px)</h3>
            <p className="text-s-regular mb-1">Text-S/regular (12px/16px)</p>
            <p className="text-s-medium mb-1">Text-S/medium (12px/16px)</p>
            <p className="text-s-semibold mb-6">Text-S/semibold (12px/16px)</p>
          </div>

          <div>
            <h3 className="heading-4-semibold mb-4">Text M (14px)</h3>
            <p className="text-m-regular mb-1">Text-M/regular (14px/20px)</p>
            <p className="text-m-medium mb-1">Text-M/medium (14px/20px)</p>
            <p className="text-m-semibold mb-6">Text-M/semibold (14px/20px)</p>

            <h3 className="heading-4-semibold mb-4">Text L (16px)</h3>
            <p className="text-l-regular mb-1">Text-L/regular (16px/20px)</p>
            <p className="text-l-medium mb-1">Text-L/medium (16px/20px)</p>
            <p className="text-l-semibold mb-6">Text-L/semibold (16px/20px)</p>
          </div>
        </div>
      </section>

      {/* Heading Styles */}
      <section className="mb-12">
        <h2 className="heading-3-bold mb-4 border-b pb-2">Heading Styles</h2>

        <div className="space-y-8">
          <div>
            <h3 className="heading-4-semibold mb-4">Heading 4 (20px)</h3>
            <p className="heading-4-regular mb-1">
              Heading 4/regular (20px/26px)
            </p>
            <p className="heading-4-medium mb-1">
              Heading 4/medium (20px/26px)
            </p>
            <p className="heading-4-semibold mb-6">
              Heading 4/semibold (20px/26px)
            </p>
          </div>

          <div>
            <h3 className="heading-4-semibold mb-4">Heading 3 (24px)</h3>
            <p className="heading-3-regular mb-1">
              Heading 3/regular (24px/30px)
            </p>
            <p className="heading-3-medium mb-1">
              Heading 3/medium (24px/30px)
            </p>
            <p className="heading-3-semibold mb-1">
              Heading 3/semibold (24px/30px)
            </p>
            <p className="heading-3-bold mb-6">Heading 3/bold (24px/30px)</p>
          </div>

          <div>
            <h3 className="heading-4-semibold mb-4">Heading 2 (32px)</h3>
            <p className="heading-2-regular mb-1">
              Heading 2/regular (32px/40px)
            </p>
            <p className="heading-2-medium mb-1">
              Heading 2/medium (32px/40px)
            </p>
            <p className="heading-2-semibold mb-1">
              Heading 2/semibold (32px/40px)
            </p>
            <p className="heading-2-bold mb-6">Heading 2/bold (32px/40px)</p>
          </div>

          <div>
            <h3 className="heading-4-semibold mb-4">Heading 1 (40px)</h3>
            <p className="heading-1-regular mb-1">
              Heading 1/regular (40px/50px)
            </p>
            <p className="heading-1-medium mb-1">
              Heading 1/medium (40px/50px)
            </p>
            <p className="heading-1-semibold mb-1">
              Heading 1/semibold (40px/50px)
            </p>
            <p className="heading-1-bold mb-6">Heading 1/bold (40px/50px)</p>
          </div>

          <div>
            <h3 className="heading-4-semibold mb-4">Heading 1 Large (60px)</h3>
            <p className="text-xl-regular mb-1">Heading 1/large (60px/50px)</p>
            <p className="text-xl-medium mb-1">
              Heading 1/large-medium (60px/50px)
            </p>
            <p className="text-xl-semibold mb-1">
              Heading 1/large-semibold (60px/50px)
            </p>
            <p className="text-xl-bold mb-6">
              Heading 1/large-bold (60px/50px)
            </p>
          </div>

          <div>
            <h3 className="heading-4-semibold mb-4">Heading 1 XL (72px)</h3>
            <p className="text-xxl-regular mb-1">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-xxl-medium mb-1">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-xxl-semibold mb-1">
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-xxl-bold mb-6">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <h2 className="heading-3-bold mb-4 border-b pb-2">Example Usage</h2>

        <div className="bg-primary-100 mb-8 rounded-lg p-6">
          <h3 className="heading-2-bold mb-2">Article Title</h3>
          <p className="heading-4-medium mb-4">
            This is a subtitle with medium weight
          </p>
          <p className="text-m-regular mb-4">
            This is a paragraph with regular text that uses the medium (14px)
            size. It demonstrates how the BeVietnamPro font looks in a real
            context.
          </p>
          <button className="bg-primary-500 text-s-semibold rounded px-4 py-2">
            Call to Action
          </button>
        </div>
      </section>
    </div>
  )
}
