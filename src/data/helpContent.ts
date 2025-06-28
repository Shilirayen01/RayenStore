// src/data/helpContent.ts

export interface HelpItem {
  id: string;
  question: string;
  answer: string;
  shortLabel: string;
}

export const helpContent: HelpItem[] = [
  {
    id: 'site-security',
    question: 'LE SITE RAYENSTORE.COM EST-IL SÉCURISÉ ?',
    answer:
      'Oui, notre site est entièrement sécurisé en HTTPS. Notre partenaire bancaire Stripe garantit également la sécurisation de tous les paiements effectués sur RayenStore.com. Nous adhérons à la CNIL et respectons la confidentialité de vos informations personnelles.',
    shortLabel: 'Le site RayenStore.com est-il sécurisé...',
  },
  {
    id: 'delivery-time',
    question: 'COMBIEN DE TEMPS VA METTRE MA COMMANDE POUR ARRIVER CHEZ MOI ?',
    answer:
      'En règle générale, une commande vous parviendra sous 72h ouvrés. (Reportez-vous systématiquement sur la fiche du produit que vous commandez pour plus d\'informations)\n\nLe délai de livraison varie selon le mode de livraison choisi et les articles présents dans votre panier.\n\nLa date estimée de livraison est affichée avant le paiement, lors du choix du mode de livraison.\n\nEn moyenne, comptez 48 heures pour l\'acheminement, hors délais de préparation.\n\nPour plus de détails, consultez la fiche produit ou votre récapitulatif de commande.',
    shortLabel: 'Combien de temps va mettre...',
  },
  {
    id: 'what-if',
    question: 'QUE PUIS-JE FAIRE SI...',
    answer:
      'Veuillez décrire votre problème spécifique ici, et nous vous guiderons. (Ex: "Je n\'ai pas reçu mon colis", "Mon produit est défectueux", etc.)',
    shortLabel: 'Que puis-je faire si...',
  },
  {
    id: 'ordering-problems',
    question: 'J\'AI DES PROBLÈMES POUR COMMANDER...',
    answer:
      'Si vous rencontrez des difficultés lors de votre commande, veuillez vérifier votre connexion internet, essayer un autre navigateur, ou contacter notre service client pour une assistance personnalisée.',
    shortLabel: 'J\'ai des problèmes pour commander...',
  },
  {
    id: 'change-order',
    question: 'PUIS-JE CHANGER LA COMMANDE...',
    answer:
      'Une fois votre commande confirmée, il est généralement difficile de la modifier. Veuillez contacter notre service client dès que possible si vous souhaitez apporter des changements. Des frais de modification ou d\'annulation peuvent s\'appliquer selon l\'état de la commande.',
    shortLabel: 'Puis-je changer la commande...',
  },
  {
    id: 'cancel-order',
    question: 'PUIS-JE ANNULER MA COMMANDE ?',
    answer:
      'Vous pouvez annuler votre commande tant qu\'elle n\'a pas été expédiée. Rendez-vous dans votre espace client, section "Mes commandes", ou contactez notre service client pour assistance. Des conditions spécifiques peuvent s\'appliquer.',
    shortLabel: 'Puis-je annuler ma commande ?',
  },
  {
    id: 'two-orders',
    question: 'J\'AI PASSÉ COMMANDE DEUX OU...',
    answer:
      'Si vous avez passé plusieurs commandes par erreur ou si vous avez une question concernant des commandes multiples, veuillez contacter notre service client avec les numéros de commande pour que nous puissions vous aider à regrouper ou à gérer vos commandes.',
    shortLabel: 'J\'ai passé commande deux ou...',
  },
  {
    id: 'not-received',
    question: 'JE N\'AI RIEN REÇU DE...',
    answer:
      'Si vous n\'avez pas reçu votre commande dans les délais prévus, veuillez vérifier le statut de votre colis avec le numéro de suivi fourni. Si le problème persiste, contactez notre service client pour une investigation approfondie.',
    shortLabel: 'Je n\'ai rien reçu de...',
  },
];
