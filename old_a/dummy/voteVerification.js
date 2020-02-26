export default {
  YES: [
    {
      type: 'message',
      text:
        'Hier wird in Zukunft ein Contra-Argumentstitel von einem anderen Nutzer stehen und das ist auch gut so, sonst bleibst du ja uninformiert.',
      moreText:
        'Der Detailtext wird hier angezeigt, weil ein Argument weit mehr als 140 Zeichen enthalten kann. Der Titel ist der Eye-Catcher, der Detailtext die Überzeugungsarbeit. Hier wird das Argument detailliert dargelegt und mit Quellen begründet.',
      argumentation: 'contra',
      _id: 1,
    },
    {
      type: 'link',
      title: 'democracy-app.de',
      text: 'Studie bestätigt: IQ steigt durchs Argumentieren',
      image: require('../assets/images/example1-vote-verification.jpg'),
      argumentation: 'contra',
      _id: 2,
    },
    {
      type: 'link',
      title: 'YouTube',
      text: 'Wie Gegenargumente dein Bewusstsein erweitern',
      image: require('../assets/images/example2-vote-verification.jpg'),
      argumentation: 'contra',
      _id: 3,
    },
  ],
  ABSTINATION: [
    {
      type: 'message',
      text:
        'Hier wird in Zukunft ein Contra-Argumentstitel von einem anderen Nutzer stehen und das ist auch gut so, sonst bleibst du ja uninformiert.',
      moreText:
        'Der Detailtext wird hier angezeigt, weil ein Argument weit mehr als 140 Zeichen enthalten kann. Der Titel ist der Eye-Catcher, der Detailtext die Überzeugungsarbeit. Hier wird das Argument detailliert dargelegt und mit Quellen begründet.',
      argumentation: 'contra',
      _id: 4,
    },
    {
      type: 'message',
      text:
        'Hier wird in Zukunft ein Pro-Argumentstitel von einem anderen Nutzer stehen und das ist auch gut so, sonst bleibst du ja uninformiert.',
      moreText:
        'Der Detailtext wird hier angezeigt, weil ein Argument weit mehr als 140 Zeichen enthalten kann. Der Titel ist der Eye-Catcher, der Detailtext die Überzeugungsarbeit. Hier wird das Argument detailliert dargelegt und mit Quellen begründet.',
      argumentation: 'pro',
      _id: 5,
    },
  ],
  NO: [
    {
      type: 'message',
      text:
        'Hier wird in Zukunft ein Pro-Argumentstitel von einem anderen Nutzer stehen und das ist auch gut so, sonst bleibst du ja uninformiert.',
      moreText:
        'Der Detailtext wird hier angezeigt, weil ein Argument weit mehr als 140 Zeichen enthalten kann. Der Titel ist der Eye-Catcher, der Detailtext die Überzeugungsarbeit. Hier wird das Argument detailliert dargelegt und mit Quellen begründet.',
      argumentation: 'pro',
      _id: 6,
    },
    {
      type: 'link',
      title: 'democracy-app.de',
      text: 'Studie bestätigt: IQ steigt durchs Argumentieren',
      image: require('../assets/images/example1-vote-verification.jpg'),
      argumentation: 'pro',
      _id: 7,
    },
    {
      type: 'link',
      title: 'YouTube',
      text: 'Wie Gegenargumente dein Bewusstsein erweitern',
      image: require('../assets/images/example2-vote-verification.jpg'),
      argumentation: 'pro',
      _id: 8,
    },
  ],
};
