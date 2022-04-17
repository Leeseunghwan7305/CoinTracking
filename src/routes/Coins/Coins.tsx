import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { getCoins } from "../../api/api";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
const Loading = styled.span`
  text-align: center;
  display: block;
`;
export interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Coins = () => {
  let [coins, setCoins] = useState<CoinInterface[]>([]);
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    //useEffect에서 동기 처리할려면?
    (async () => {
      const coinData = await getCoins();
      setLoading(false);
      console.log(coinData);
      const array: CoinInterface[] = coinData.slice(0, 100);
      //splice() 메소드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다
      //slice() == 새로운 배열
      setCoins(array);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinList>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))
        )}
      </CoinList>
    </Container>
  );
};

export default Coins;
