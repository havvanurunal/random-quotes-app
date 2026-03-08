type SubtitleProp = {
  title: string;
};

export function Subtitle({ title }: SubtitleProp) {
  return <p className='text-lg md:text-xl'>{title}</p>;
}
