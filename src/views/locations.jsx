import React, { useEffect, useState } from "react";
import { Row, Content, Table, Cell, Line } from "../components/layout";
import { Button, Modal, Spacer, Text } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { locationActions, getLocations } from "../store/locationSlice";
const Locations = () => {
  const state = useSelector((state) => state.locationSlice);
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
    dispatch(getLocations(state.page));
  }, [dispatch, state.page]);
  return (
    <Content>
      <Text h1>Locations</Text>
      <Spacer y={1} />
      <Table>
        {/* Head of table and filtering */}
        <Row>
          <Cell>
            <Text p onClick={() => locationActions.filter("name")}>
              Name
            </Text>
          </Cell>
          <Cell>
            <Text p onClick={() => locationActions.filter("type")}>
              Type
            </Text>
          </Cell>
          <Cell>
            <Text p onClick={() => locationActions.filter("dimension")}>
              Dimension
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
              Type: {state.posts.results[id].type}
            </Modal.Header>
            <Modal.Body>
              Dimension: <Text p>{state.posts.results[id].dimension}</Text>
            </Modal.Body>
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
                  <Text p>{character.type}</Text>
                </Cell>
                <Cell>
                  <Text p>{character.dimension}</Text>
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
              <Button onClick={() => dispatch(locationActions.prev())}>
                Prev
              </Button>
            ) : (
              <Button disabled>Prev</Button>
            )}
            {state.posts.info.next !== null ? (
              <Button onClick={() => dispatch(locationActions.next())}>
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
export default Locations;
