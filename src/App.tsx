import React from "react";
import "./App.css";
import { Button, Card, Flex, Input, Layout, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import ImageUploader from "./components/ImageUploader/ImageUploader";
import TextRecognition from "./components/TextRecognition/TextRecognition";
import UICCheckNumber from "./utils/UICCheckNumber";

const { Header } = Layout;

function App() {
  const [rollingStock, setRollingStock] = React.useState<any[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const handlerRemoveRollingStock = (index: number) => {
    const newRollingStock = rollingStock.filter(
      (stock: any, i: number) => i !== index
    );
    setRollingStock([...newRollingStock]);
  };

  return (
    <div className="App">
      <Header>
        <Typography.Title style={{ height: "maxContent", color: "white" }}>
          Rolling Stock Identification
        </Typography.Title>
      </Header>

      <Layout style={{ padding: "50px" }}>
        <Flex align="center" gap={5}>
          {rollingStock.map((stock: any, index: number) => {
            return (
              <RollingStock
                trainPosition={index + 1}
                uicNumber={stock.uicNumber}
                remove={() => handlerRemoveRollingStock(index)}
                changeUicNumber={(uicNumber: string) => {
                  const newRollingStock = rollingStock.map((stock, i) => {
                    if (i === index) {
                      return { uicNumber };
                    }
                    return stock;
                  });
                  setRollingStock(newRollingStock);
                }}
              />
            );
          })}
          <Button
            onClick={() =>
              setRollingStock([...rollingStock, { uicNumber: "1234" }])
            }
            icon={<PlusCircleOutlined />}
          >
            Add Rolling Stock
          </Button>
        </Flex>
      </Layout>
      <ImageUploader
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <TextRecognition selectedImage={selectedImage} />
    </div>
  );
}

function displayUICNumber(uicNumber: string) {
  if (UICCheckNumber(uicNumber)) {
    return uicNumber.replace(
      /(\d{2})(\d{2})(\d{4})(\d{3})(\d{1})/,
      "$1 $2 $3 $4-$5"
    );
  }
  return "Invalid UIC Number";
}

function RollingStock(props: {
  trainPosition: number;
  uicNumber: string;
  remove: () => void;
  changeUicNumber: (uicNumber: string) => void;
}) {
  const [mass, setMass] = React.useState(0);

  return (
    <Card
      title={`Rolling Stock ${props.trainPosition}`}
      style={{ width: 300 }}
      extra={<Button onClick={props.remove} icon={<DeleteOutlined />} />}
    >
      <Tag icon={<TagsOutlined />}>{displayUICNumber(props.uicNumber)}</Tag>
      <Input
        type="text"
        value={props.uicNumber}
        onChange={(e) => props.changeUicNumber(e.target.value)}
        status={UICCheckNumber(props.uicNumber) ? "" : "error"}
      />
      <Input
        type="number"
        value={mass}
        onChange={(e) => setMass(parseInt(e.target.value))}
      />
    </Card>
  );
}

export default App;
