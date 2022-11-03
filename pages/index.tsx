import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { createLinkUrl } from "../utils/createLinkUrl";
import { fetchGraphQL } from "../utils/fetch";

type Response = {
  data: {
    auctionsByStatus: Array<{
      title: string;
      id: number;
      community: {
        name: string;
      };
      proposals: Array<{
        id: number;
        title: string;
        tldr: string;
        address: string;
        voteCount: number;
      }>;
    }>;
  };
};

const AuctionStatus = {
  Open: "Open",
  Voting: "Voting",
};

const Home: NextPage = () => {
  const [isHideLoading, setIsHideLoading] = useState(false);
  const [auctionStatus, setAuctionStatus] = useState(AuctionStatus.Voting);
  const [auctionData, setAuctionData] = useState<
    undefined | Response["data"]["auctionsByStatus"]
  >();
  const [isHideVoteCountZero, setIsHideVoteCountZero] =
    useState<boolean>(false);
  const [isViewTopThree, setIsViewTopThree] = useState<boolean>(true);
  const [isHideVoteSmallerThan, setIsHideVoteSmallerThan] =
    useState<string>("0");

  const fetchAuctions = useCallback(
    async (status: string = auctionStatus) => {
      setIsHideLoading(false);

      const value: Response = await fetchGraphQL(`
    {
      auctionsByStatus(status: ${status}) {
        title
        id
        status
        community {
          name
        }
        proposals {
          id
          title
          tldr
          address
          voteCount
        }
      }
    }
      `);
      const _auctionData = value.data.auctionsByStatus;

      _auctionData
        .sort((auctionA, auctionB) =>
          auctionA.proposals.length < auctionB.proposals.length ? 1 : -1
        )
        .forEach((auction) => {
          auction.proposals.sort((propA, propB) =>
            propA.voteCount < propB.voteCount ? 1 : -1
          );
        });

      setAuctionData(_auctionData);
      setIsHideLoading(true);
    },
    [auctionStatus, setAuctionData]
  );

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions, auctionStatus]);

  const handleChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setAuctionStatus(e.currentTarget?.value);
    },
    [setAuctionStatus]
  );

  const handleChangeViewTopThree = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsViewTopThree(e.currentTarget?.checked);
    },
    [setIsViewTopThree]
  );

  const handleChangeHideVoteCountZero = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsHideVoteCountZero(e.currentTarget?.checked);
    },
    [setIsHideVoteCountZero]
  );

  const handleChangeHideVoteSmallerThan = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsHideVoteSmallerThan(e.currentTarget?.value);
    },
    [setIsHideVoteSmallerThan]
  );

  const Proposal = ({
    communityName,
    auctionTitle,
    proposalId,
    proposalTitle,
  }: {
    communityName: string;
    auctionTitle: string;
    proposalId: number;
    proposalTitle: string;
  }) => {
    return (
      <li className={styles.proposal} key={proposalId}>
        <a
          href={createLinkUrl({
            communityName,
            auctionTitle,
            proposalId,
          })}
          rel="noopener noreferrer"
        >
          #{proposalId} {proposalTitle}
        </a>
      </li>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>View Hot Props in Prop House</title>
        <meta name="description" content="View Hot Props is a web application that picks up and displays the
          exciting props at each community house." />
        <link rel="icon" href="favicon.ico" />
        <base target="_blank"></base>
        <meta property="og:url" content="https://norark.github.io/Prop-House-Hackathon-View-Hot-Props/" />
        <meta property="og:title" content="View Hot Props | Prop House | NORARK" />
        <meta property="og:site_name" content="View Hot Props" />
        <meta property="og:description" content="View Hot Props is a web application that picks up and displays the
          exciting props at each community house." />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>View Hot Props in Prop House</h1>
      </header>

      {!isHideLoading && (
        <div className={styles.loading}>
          <svg
            className={styles.logo}
            width="320"
            height="320"
            viewBox="0 0 320 320"
            xmlns="http://www.w3.org/2000/svg"
            shape-rendering="crispEdges"
          >
            <rect width="100%" height="100%" fill="none" />
            <rect
              width="60"
              height="10"
              x="100"
              y="110"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="60"
              height="10"
              x="170"
              y="110"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="100"
              y="120"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="110"
              y="120"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="130"
              y="120"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="150"
              y="120"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="170"
              y="120"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="180"
              y="120"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="200"
              y="120"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="220"
              y="120"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="40"
              height="10"
              x="70"
              y="130"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="110"
              y="130"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="130"
              y="130"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="30"
              height="10"
              x="150"
              y="130"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="180"
              y="130"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="200"
              y="130"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="220"
              y="130"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="70"
              y="140"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="100"
              y="140"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="110"
              y="140"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="130"
              y="140"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="150"
              y="140"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="170"
              y="140"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="180"
              y="140"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="200"
              y="140"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="220"
              y="140"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="70"
              y="150"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="100"
              y="150"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="110"
              y="150"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="130"
              y="150"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="150"
              y="150"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="170"
              y="150"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="180"
              y="150"
              fill="#ffffff"
              shape-rendering="crispEdges"
            />
            <rect
              width="20"
              height="10"
              x="200"
              y="150"
              fill="#000000"
              shape-rendering="crispEdges"
            />
            <rect
              width="10"
              height="10"
              x="220"
              y="150"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="60"
              height="10"
              x="100"
              y="160"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
            <rect
              width="60"
              height="10"
              x="170"
              y="160"
              fill="#2b83f6"
              shape-rendering="crispEdges"
            />
          </svg>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.description}>
          <p><strong>Hackathon has ended. It will not be maintained for a while from now on.</strong></p>
          <p>View Hot Props is a web application that picks up and displays the
          exciting props at each community house.</p>
        </div>

        <aside className={styles.control}>
          <label className={styles.item}>
            <span>Auction Status : </span>
            <select onChange={handleChangeSelect}>
              <option value={AuctionStatus.Voting}>Voting</option>
              <option value={AuctionStatus.Open}>Open</option>
            </select>
            <span>
              {auctionStatus === AuctionStatus.Open
                ? " <- Select Voting to view props."
                : " <- Select Open to view open rounds."}
            </span>
          </label>
          <label className={styles.item}>
            <span>View the top 3 voted props only : </span>
            <input
              type="checkbox"
              defaultChecked
              onChange={handleChangeViewTopThree}
            />
          </label>
          <label className={styles.item}>
            <span>Hide props when the vote count is 0 : </span>
            <input type="checkbox" onChange={handleChangeHideVoteCountZero} />
          </label>
          <label className={styles.item}>
            <span>Hide props when the vote counts smaller than: </span>
            <input
              type="number"
              defaultValue={0}
              min={0}
              onChange={handleChangeHideVoteSmallerThan}
            />
          </label>
        </aside>

        <section className={styles.communities}>
          {auctionData &&
            auctionData.map((auction) => {
              return (
                <article className={styles.house} key={auction.id}>
                  <h2 className={styles.houseTitle}>
                    {auction.community.name}
                  </h2>
                  <h3 className={styles.auctionTitle}>{auction.title}</h3>

                  {auction.proposals.length > 0 &&
                    auctionStatus === AuctionStatus.Voting && (
                      <>
                        <h4 className={styles.proposalTitle}>Props</h4>
                        <ol className={styles.proposals}>
                          {isViewTopThree
                            ? auction.proposals.slice(0, 3).map((proposal) => {
                                return (
                                  <Proposal
                                    key={proposal.id}
                                    auctionTitle={auction.title}
                                    communityName={auction.community.name}
                                    proposalId={proposal.id}
                                    proposalTitle={proposal.title}
                                    {...proposal}
                                  />
                                );
                              })
                            : auction.proposals.map((proposal) => {
                                const smallerCount = Number(
                                  isHideVoteSmallerThan
                                );
                                let isDisplay = isHideVoteCountZero
                                  ? proposal.voteCount > 0
                                  : true;
                                isDisplay =
                                  smallerCount > 0
                                    ? proposal.voteCount > smallerCount
                                    : isDisplay;

                                return (
                                  isDisplay && (
                                    <Proposal
                                      key={proposal.id}
                                      auctionTitle={auction.title}
                                      communityName={auction.community.name}
                                      proposalId={proposal.id}
                                      proposalTitle={proposal.title}
                                    />
                                  )
                                );
                              })}
                        </ol>
                      </>
                    )}
                </article>
              );
            })}
        </section>
      </main>

      <footer className={styles.footer}>
        <ul className={styles.footerLinks}>
          <li className={styles.footerLinkItem}>
            <a href="https://prop.house/">Prop House</a>
          </li>
          <li className={styles.footerLinkItem}>
            <a href="https://github.com/Prop-House">Prop House | GitHub</a>
          </li>
          <li
            className={[
              styles.footerLinkItem,
              styles["footerLinkItem--brand"],
            ].join(" ")}
          >
            <a href="https://twitter.com/N0RARK">NORARK | Twitter</a>
          </li>
          <li
            className={[
              styles.footerLinkItem,
              styles["footerLinkItem--brand"],
            ].join(" ")}
          >
            <a href="https://github.com/NORARK">NORARK | GitHub Profile</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
