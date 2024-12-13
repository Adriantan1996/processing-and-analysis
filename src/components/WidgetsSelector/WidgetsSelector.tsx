import { useState } from "react";
import { RootState } from "../../state/store";
import Button, { ButtonProps } from "../Button/Button";
import useModal from "../hooks/useModal";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addChart, ChartData, ChartType } from "../../state/chartSlice";

/**
 * @params NIL
 * useModalHook to open Modal for X and Y axis Selection
 * Display Modal
 * retrieve Store values (csv slice)
 * @returns Return 3 Buttons Line, Bar, Pie
 */
const WidgetsSelector = () => {
  const dispatch = useDispatch(); // displatch action for adding chart
  const [chartType, setChartType] = useState<ChartType | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal(); // useModal hook
  // csv files
  const files = useSelector((state: RootState) => state.csv.files); // retrieve files from store
  const activeFileId = useSelector(
    (state: RootState) => state.csv.activeFileId
  );
  const activeFile = files.find((file) => file.id === activeFileId); // retrieve active file

  // Chart
  const onColumnSelect = (xColumn: string, yColumn: string) => {
    if (!chartType) return;
    const chartData: Omit<ChartData, "id"> = {
      chartType,
      xColumn,
      yColumn,
      fileId: activeFileId,
    };

    dispatch(addChart(chartData)); // add chart to store
  };
  const buttonArray: ButtonProps[] = [
    {
      onClickHandler: () => {
        setChartType(ChartType.Line);
        openModal();
      },
      buttonText: "Line Chart",
    },
    {
      onClickHandler: () => {
        setChartType(ChartType.Bar);
        openModal();
      },
      buttonText: "Bar Chart",
    },
    {
      onClickHandler: () => {
        setChartType(ChartType.Pie);
        openModal();
      },
      buttonText: "Pie Chart",
    },
  ];
  if (!activeFileId) return null;
  return (
    <div className="flex w-full justify-between px-4">
      {buttonArray.map((button, index) => {
        return (
          <Button
            key={index}
            onClickHandler={button.onClickHandler}
            buttonText={button.buttonText}
          />
        );
      })}
      <Modal
        file={activeFile}
        onColumnSelect={onColumnSelect}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default WidgetsSelector;
