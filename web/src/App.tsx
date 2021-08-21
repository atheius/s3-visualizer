import React, { useState, useEffect } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { getAnalysis, getBuckets } from './Api';
import { defaultExtensionColour, getExtensionColour } from './Extensions';
import filesize from 'filesize';
import Plot from 'react-plotly.js';

/**
 * Recursive function to create folder data
 * @param obj - The next object
 * @returns array of folder items
 */
const createFolderTreeData = (
  obj: { Key: any; Size: number },
  parent: string | null = null,
) => {
  const items = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key !== 'Size') {
      items.push({ Key: key, Size: obj[key].Size, Parent: parent || 'All' });
      if (typeof obj[key] === 'object') {
        items.push(...createFolderTreeData(value, key));
      }
    }
  }
  return items;
};

function App() {
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [bucketName, setBucketName] = useState('');
  const [bucketStats, setBucketStats] = useState(null);
  const [chartData, setChartData] = useState(null);

  React.useEffect(() => {
    setPageLoading(true);
    getBuckets()
      .then(({ data }: any) => {
        setBuckets(data);
        setBucketName(data[0].Name);
      })
      .finally(() => setPageLoading(false));
  }, []);

  /**
   * Create a chart using bucket stats data
   */
  const renderChart = () => {
    const folderData = bucketStats.folders
      ? createFolderTreeData(bucketStats.folders)
      : [];

    setChartData([
      {
        type: 'treemap',
        branchvalues: 'total',
        marker: {
          colors: [
            ...folderData.map(() => defaultExtensionColour),
            ...bucketStats.objects.map((item) =>
              getExtensionColour(
                item.Key.match(/[^.]+$/) ? item.Key.match(/[^.]+$/) : null,
              ),
            ),
          ],
        },
        labels: [
          ...folderData.map((item) => item.Key),
          ...bucketStats.objects.map(
            (item) => `${item.Key.split('/').pop()} (${filesize(item.Size)})`,
          ),
        ],
        values: [
          ...folderData.map((item) => item.Size),
          ...bucketStats.objects.map((item) => item.Size),
        ],
        parents: [
          ...folderData.map((item) => item.Parent),
          ...bucketStats.objects.map(
            (item) => item.Key.split('/').slice(0, -1).slice(-1)[0] || 'All',
          ),
        ],
      },
    ]);
  };

  useEffect(() => {
    if (bucketStats) {
      renderChart();
    }
  }, [bucketStats]);

  const runAnalysis = async () => {
    try {
      const { data } = await getAnalysis(bucketName);
      setBucketStats(data);
    } catch (err) {
      console.error('Failed to analyse bucket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="App bg-white pt-1"
      style={{
        minHeight: '100vh',
        height: '100%',
        marginLeft: '4%',
        marginRight: '4%',
      }}
    >
      <hr className="mt-5" style={{ width: '70%', margin: 'auto' }} />

      <div className="jumbotron jumbotron-fluid mt-3 text-center">
        <div className="container">
          <img src="/bucket.svg" alt="bucket" style={{ width: '90px' }} />
          <h1 className="display-4">S3 Bucket Visualizer</h1>
          <p className="lead">Map the contents of a bucket</p>
        </div>
      </div>
      <hr className="mt-5" style={{ width: '70%', margin: 'auto' }} />
      <div className="container text-left">
        {pageLoading && (
          <div className="mt-5 d-flex justify-content-center">
            <i className="fa fa-3x fa-cog fa-spin text-muted" />
          </div>
        )}
        {!pageLoading && (
          <div>
            <Row className="mt-5 align-items-center justify-content-center">
              <Col xs="auto">
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Select a bucket"
                >
                  <Form.Select
                    style={{ minWidth: '50%' }}
                    // @ts-ignore
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const newBucket = event.target.value;
                      setBucketName(newBucket);
                    }}
                  >
                    {buckets.map((bucket: any, idx: number) => {
                      return (
                        <option key={idx} value={bucket.Name}>
                          {bucket.Name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mt-4 align-items-center justify-content-center">
              <Button
                variant={'primary'}
                size={'sm'}
                style={{ width: '150px' }}
                onClick={() => {
                  setLoading(true);
                  runAnalysis();
                }}
              >
                {loading ? (
                  <i className="fa fa-cog fa-spin" />
                ) : (
                  <span>View</span>
                )}
              </Button>
            </Row>

            {bucketStats && (
              <div className="mt-5 d-flex justify-content-around">
                <div className="display-4" style={{ fontSize: 'xx-large' }}>
                  Total Objects: <strong>{bucketStats.numObjects}</strong>
                </div>
                <div className="display-4" style={{ fontSize: 'xx-large' }}>
                  Total Size: <strong>{filesize(bucketStats.totalSize)}</strong>
                </div>
              </div>
            )}

            {chartData && (
              <div style={{ width: '100%' }}>
                <Plot
                  data={chartData}
                  layout={{
                    autosize: true,
                  }}
                  useResizeHandler
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
