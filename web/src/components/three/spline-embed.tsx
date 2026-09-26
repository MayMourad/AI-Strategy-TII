interface SplineEmbedProps {
  url: string
  className?: string
  title?: string
}

export function SplineEmbed({ url, className, title = "3D DNA helix" }: SplineEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        className="h-full w-full border-0"
        allow="fullscreen; xr-spatial-tracking"
      />
    </div>
  )
}
