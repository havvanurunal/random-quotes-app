type SubtitleProps = {
  title: string;
};

export function Subtitle({ title }: SubtitleProps) {
  return <p className='text-lg md:text-xl'>{title}</p>;
}
