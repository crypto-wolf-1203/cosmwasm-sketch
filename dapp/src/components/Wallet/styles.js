import styled from 'styled-components'

export const WalletContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .wallet-connect-button {
    border-radius: 100px;
    padding: 10px 24px;
    background: #99a316;
    cursor: pointer;
    user-select: none;

    text-decoration: none;
    color: black;
  }

  .wallet-address-text {
    margin: 20px 0px;
    font-size: 1.2rem;
  }
`;

