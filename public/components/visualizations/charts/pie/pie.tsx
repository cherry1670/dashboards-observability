/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Pie = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const { xaxis = null, yaxis = null } = visualizations.data.customVizConfigs;
  const lastIndex = fields.length - 1;

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [
      ...visualizations?.data?.customVizConfigs[vis.seriesAxis].map((item) => ({
        ...item,
        name: item.label,
      })),
    ];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const pies = valueSeries.map((field: any) => {
    return {
      labels: data[xaxis ? xaxis[0]?.label : fields[lastIndex].name],
      values: data[field.name],
      type: 'pie',
      name: field.name,
    };
  });

  return (
    <Plt
      data={pies}
      layout={layout}
      config={config}
      // layout={{
      //   colorway: PLOTLY_COLOR,
      //   plot_bgcolor: 'rgba(0, 0, 0, 0)',
      //   paper_bgcolor: 'rgba(0, 0, 0, 0)',
      //   xaxis: {
      //     fixedrange: true,
      //     showgrid: false,
      //     visible: true,
      //   },
      //   yaxis: {
      //     fixedrange: true,
      //     showgrid: false,
      //     visible: true,
      //   },
      //   ...layout,
      // }}
      // config={{
      //   barmode: 'pie',
      //   xaxis: {
      //     automargin: true,
      //   },
      //   yaxis: {
      //     automargin: true,
      //   },
      //   ...config,
      // }}
      // dispatch={dispatch}
    />
  );
};
