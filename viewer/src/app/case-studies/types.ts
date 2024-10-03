/**
 * A stakeholder that is mentioned in a case study
 */
export interface Stakeholder {
  // name of the stakeholder
  name: string;
  // a url or a mail address to contact the stakeholder
  contact?: string;
}

export interface CaseStudy {
  // unique identifier based on the filename
  id: string;
  // name of the case study
  headline: string;
  // date when the case study was created
  createdAt: string;
  // short summary of the case study
  summary: string;
  // url to the image of the case study
  imageUrl?: string;
  // url to the case study
  url: string;
  // list of hash tags that are relevant for the case study
  hashTags?: string[];
  // list of wallets and agents that are mentioned in the case study
  references?: string[];
  // a list of stakeholders that are mentioned in the case study
  stakeholders?: Stakeholder[];
}
