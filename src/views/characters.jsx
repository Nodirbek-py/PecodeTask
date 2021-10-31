import React, { useEffect, useState } from "react";
import { Row, Content, Table, Cell, Line } from "../components/layout";
import { Avatar, Button, Modal, Spacer, Text } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter, characterActions } from "../store/characterSlice";
const Character = () => {
  const state = useSelector((state) => state.characterSlice);
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
    dispatch(getCharacter(state.page));
  }, [dispatch, state.page]);
  return (
    <Content>
      <Text h1>Characters</Text>
      <Spacer y={1} />
      <Table>
        {/* Head of table and filtering */}
        <Row>
          <Cell>
            <Text p>Name</Text>
          </Cell>
          <Cell>
            <Text
              className="pointer"
              onClick={() => dispatch(characterActions.filter("gender"))}
              p
            >
              Gender
            </Text>
          </Cell>
          <Cell>
            <Text
              className="pointer"
              onClick={() => dispatch(characterActions.filter("status"))}
              p
            >
              Status
            </Text>
          </Cell>
          <Cell>
            <Text
              className="pointer"
              onClick={() => dispatch(characterActions.filter("species"))}
              p
            >
              Species
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
              {state.posts.results[id].image ? (
                <Avatar
                  size={200}
                  src={state.posts.results[id].image}
                  zoomed
                  color="primary"
                  bordered
                />
              ) : null}
              <Spacer x={2} />
              Name: {state.posts.results[id].name}
            </Modal.Header>
            <Modal.Body>
              Status: <Text p>{state.posts.results[id].status}</Text>
              Species: <Text p>{state.posts.results[id].species}</Text>
              Status: <Text p>{state.posts.results[id].status}</Text>
              Gender: <Text p>{state.posts.results[id].gender}</Text>
            </Modal.Body>
            <Modal.Footer>
              Location: <Text p>{state.posts.results[id].location.name}</Text>
              Origin: <Text p>{state.posts.results[id].origin.name}</Text>
            </Modal.Footer>
          </Modal>
        ) : null}
        {/* Main body of table and mapping datas from api */}
        {state.status === "success" ? (
          state.posts.results.map((character, index) => {
            return (
              <Row key={character.id} onClick={() => opener(index)}>
                <Cell>
                  <Text p>{character.name}</Text>
                </Cell>
                <Cell>
                  <Text p>{character.gender}</Text>
                </Cell>
                <Cell>
                  <Text p>{character.status}</Text>
                </Cell>
                <Cell>
                  <Text p>{character.species}</Text>
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
              <Button onClick={() => dispatch(characterActions.prev())}>
                Prev
              </Button>
            ) : (
              <Button disabled>Prev</Button>
            )}
            {state.posts.info.next !== null ? (
              <Button onClick={() => dispatch(characterActions.next())}>
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
export default Character;
