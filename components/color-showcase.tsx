interface ColorGroupProps {
  title: string
  colorName: string
  shadesCount?: number
  startShade?: number
}

const ColorGroup = ({ title, colorName, shadesCount = 9 }: ColorGroupProps) => {
  let shades = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  const shadesSuccessInfo = [100, 200, 500, 700, 800]
  const shadesErrorWarning = [100, 200, 500, 600, 700]

  // Determine which shade array to use based on colorName
  let selectedShades
  if (colorName === 'success' || colorName === 'info') {
    selectedShades = shadesSuccessInfo
  } else if (colorName === 'error' || colorName === 'warning') {
    selectedShades = shadesErrorWarning
  } else if (colorName === 'neutral') {
    selectedShades = shades
  } else {
    // Primary and Secondary
    selectedShades = shades.filter((shade) => shade > 0) // Remove 0 for non-neutral colors
  }

  // Slice the appropriate number of shades
  shades = selectedShades.slice(0, shadesCount)

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
        {shades.map((shade) => (
          <div key={shade} className="flex flex-col items-center">
            <div
              className="h-16 w-16 rounded-md shadow-md"
              style={{ backgroundColor: `hsl(var(--${colorName}-${shade}))` }}
            ></div>
            <span className="mt-1 text-xs">{shade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ColorShowcase() {
  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Color System</h1>
      </div>

      <ColorGroup
        title="Neutral"
        colorName="neutral"
        startShade={0}
        shadesCount={10}
      />
      <ColorGroup
        title="Primary / Brand"
        colorName="primary"
        startShade={100}
        shadesCount={9}
      />
      <ColorGroup
        title="Secondary / Brand"
        colorName="secondary"
        startShade={100}
        shadesCount={9}
      />
      <ColorGroup
        title="Success"
        colorName="success"
        startShade={100}
        shadesCount={5}
      />
      <ColorGroup
        title="Error"
        colorName="error"
        startShade={100}
        shadesCount={5}
      />
      <ColorGroup
        title="Warning"
        colorName="warning"
        startShade={100}
        shadesCount={5}
      />
      <ColorGroup
        title="Info"
        colorName="info"
        startShade={100}
        shadesCount={5}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-surface rounded-lg border border-neutral-200 p-6">
          <h3 className="mb-2 text-xl font-semibold">Surface</h3>
          <p className="text-neutral-700">
            This is how your surface color looks with text.
          </p>
        </div>

        <div className="bg-background rounded-lg border border-neutral-200 p-6">
          <h3 className="mb-2 text-xl font-semibold">Background</h3>
          <p className="text-neutral-700">
            This is how your background color looks with text.
          </p>
        </div>
      </div>
    </div>
  )
}
