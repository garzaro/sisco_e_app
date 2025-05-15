import React from "react";
import Spinner from "./spinner";
import TextDot from "./animation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const Mensagem = styled.p`
  margin-top: 8px;
  font-size: 0.95rem;
  color: #666;
  text-align: center;
`;

const FeedbackDeRedirecionamento = ({ mensagem = "Redirecionando" }) => {
    return (
        <Container>
            <Spinner size={40} cor="primary" />
            <Mensagem>
                {mensagem}
                <TextDot />
            </Mensagem>
        </Container>
    );
};

export default FeedbackDeRedirecionamento;
