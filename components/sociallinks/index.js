import Link from 'next/link'

const SocialIconLink = (props) => {
  const { type } = props

  return (
    <div className='bg-primary-theme-color w-8 h-8 rounded-full flex items-center justify-center p-2 border-white border-[1px]'>
      <Link href='/'>
        <a>
          <img src={`/icons/${type}.svg`} alt={type} />
        </a>
      </Link>
    </div>
  )
}

export default SocialIconLink
