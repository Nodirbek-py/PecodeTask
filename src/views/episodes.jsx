import React, { useEffect, useState } from "react";
import { Row, Content, Table, Cell, Line } from "../components/layout";
import { Button, Modal, Spacer, Text } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { getEpisodes, episodeActions } from "../store/episodeSlice";
const Episode = () => {
  const state = useSelector((state) => state.episodeSlice);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const opener = (index) => {
    setOpen(true);
    setId(index);
  };
  const closer = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEpisodes(state.page));
  }, [dispatch, state.page]);
  return (
    <Content>
      <Text h1>Episodes</Text>
      <Spacer y={1} />
      <Table>
        {/* Head of table and filtering */}
        <Row>
          <Cell style={{ width: "100%" }}>
            <Text p onClick={() => dispatch(episodeActions.filter("name"))}>
              Name
            </Text>
          </Cell>
        </Row>
        <Line horizontal />
        {/* Modal */}
        {state.status === "success" ? (
          <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={open}
            onClose={closer}
          >
            <Modal.Header>
              Name: {state.posts.results[id].name}
              <Spacer x={2} />
              Episode: {state.posts.results[id].episode}
            </Modal.Header>
            <Modal.Body>
              Air Date: <Text p>{state.posts.results[id].air_date}</Text>
            </Modal.Body>
          </Modal>
        ) : null}
        {/* Main body of table and mapping datas from api */}
        {state.status === "success" ? (
          state.posts.results.map((character, index) => {
            return (
              <Row key={character.id} onClick={() => opener(index)}>
                <Cell style={{ width: "100%" }}>
                  <Text p>{character.name}</Text>
                </Cell>
              </Row>
            );
          })
        ) : (
          <Text p>{state.status}</Text>
        )}
        {state.status === "success" ? (
          <Button.Group color="secondary" rounded size="small">
            {state.posts.info.prev !== null ? (
              <Button onClick={() => dispatch(episodeActions.prev())}>
                Prev
              </Button>
            ) : (
              <Button disabled>Prev</Button>
            )}
            {state.posts.info.next !== null ? (
              <Button onClick={() => dispatch(episodeActions.next())}>
                Next
              </Button>
            ) : (
              <Button disabled>Next</Button>
            )}
          </Button.Group>
        ) : null}
      </Table>
    </Content>
  );
};
export default Episode;
