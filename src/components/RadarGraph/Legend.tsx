import React from "react";
import { DataSetCreater } from "../../helpers/CreateRadarData";

function Legend(props: {
  legend: { datasets: { backgroundColor: string; label: string }[] };
}) {
  return (
    <div className="legendAllDataSets">
      {props.legend.datasets.map(
        (dataset: { backgroundColor: string; label: string }) => {
          return (
            <div key={dataset.label} className="legendOneDataSet">
              <div
                style={{ backgroundColor: `${dataset.backgroundColor}` }}
                className="smallBox"
              ></div>
              <p className="paragraphSpacing">{dataset.label}</p>
            </div>
          );
        }
      )}
    </div>
  );
}

export default Legend;
