import {
  Slide,
  slidesData,
} from '@democracy-deutschland/mobile-ui/src/components/Introduction';

export const getSlides = ({
  lastVersion,
}: {
  lastVersion: string | undefined;
  registered: boolean;
}): Slide[] => {
  const slides: Slide[] = [];
  switch (true) {
    case !lastVersion || lastVersion < '1.2.2':
      slides.push(
        slidesData.Waehle,
        slidesData.Stimme,
        slidesData.Vergleiche,
        slidesData.Analysiere,
      );
      break;
  }
  return slides;
};
