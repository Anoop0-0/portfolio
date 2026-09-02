/**
 * Forwards any remaining props to the rendered element — without the rest
 * spread, attributes like `id` are silently dropped and anchor targets vanish.
 */
export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-5xl px-6 sm:px-8 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
