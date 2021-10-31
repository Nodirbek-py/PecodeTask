import React from "react";
import {
  Spacer,
  Text,
  Card,
  Divider,
  Button,
  Row,
  Input,
  Grid,
} from "@nextui-org/react";
import { Content } from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { watchListActions } from "../store/watchListSlice";
const Watchlist = () => {
  const state = useSelector((state) => state.watchListSlice);
  const dispatch = useDispatch();
  return (
    <Content>
      <Text h1>Watchlist</Text>
      <Spacer y={1} />
      <Grid.Container gap={3}>
        <Grid>
          <Card width="330px">
            <Card.Header>
              <Text b>Adding Episode</Text>
            </Card.Header>
            <Divider y={0} />
            <Card.Body style={{ padding: "30px" }}>
              <Input
                labelPlaceholder="Name of episode"
                status="primary"
                onChange={(e) =>
                  dispatch(watchListActions.changer(e.target.value))
                }
              />
            </Card.Body>
            <Divider y={0} />
            <Card.Footer justify="flex-end">
              <Row justify="flex-end">
                <Button
                  size="small"
                  onClick={() => dispatch(watchListActions.adding())}
                >
                  +
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid>
          <Card width="330px">
            <Card.Header>
              <Text b>Episodes</Text>
            </Card.Header>
            <Divider y={0} />
            <Card.Body style={{ padding: "30px 20px" }}>
              {state.episodes.map((episode, index) => {
                return (
                  <div key={index}>
                    <Text
                      color="primary"
                      onClick={() => dispatch(watchListActions.removing(index))}
                    >
                      {episode.name}
                    </Text>
                    <Spacer y={1} />
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Content>
  );
};
export default Watchlist;
