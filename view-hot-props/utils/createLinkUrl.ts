const url = "https://prop.house";

const regexp = /\s/g;

export const createLinkUrl = ({
  communityName,
  auctionTitle,
  proposalId,
}: {
  communityName: string;
  auctionTitle: string;
  proposalId: number;
}) => {
  return `${url}/${communityName
    .replace(regexp, "-")
    .toLowerCase()}/${auctionTitle
    .replace(regexp, "-")
    .toLowerCase()}/${proposalId}`;
};
