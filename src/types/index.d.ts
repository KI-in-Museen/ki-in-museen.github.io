export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
  partners: partner
};

export type partner = {
  name: string;
  logo: string;
  link: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
