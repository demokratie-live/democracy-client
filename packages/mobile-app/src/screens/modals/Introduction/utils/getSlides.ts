import {
  Slide,
  slidesData,
} from '@democracy-deutschland/mobile-ui/src/components/Introduction';

export const getSlides = ({
  lastVersion,
  registered,
}: {
  lastVersion: string | undefined;
  registered: boolean;
}): Slide[] => {
  const slides: Slide[] = [];
  switch (true) {
    case !lastVersion || lastVersion < '1.2.2':
      slides.push(
        slidesData.Willkommen,
        slidesData.Beobachte,
        slidesData.Informiere,
        slidesData.Stimme,
        slidesData.Vergleiche,
        slidesData.Analysiere,
      );
      break;
  }
  if (!registered) {
    slides.push(slidesData.Registrieren);
  }
  return slides;
};
