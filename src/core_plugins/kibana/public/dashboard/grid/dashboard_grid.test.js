import React from 'react';
import { shallow } from 'enzyme';
import sizeMe from 'react-sizeme';

import { DashboardViewMode } from '../dashboard_view_mode';
import { getContainerApiMock } from '../__tests__/get_container_api_mock';
import { getEmbeddableHandlerMock } from '../__tests__/get_embeddable_handlers_mock';

import { DashboardGrid } from './dashboard_grid';

jest.mock('ui/chrome', () => ({ getKibanaVersion: () => '6.0.0' }), { virtual: true });


function getProps(props = {}) {
  const defaultTestProps = {
    dashboardViewMode: DashboardViewMode.EDIT,
    panels: {
      '1': {
        gridData: { x: 0, y: 0, w: 6, h: 6, i: 1 },
        panelIndex: '1',
        type: 'visualization',
        id: '123',
        version: '7.0.0',
      },
      '2': {
        gridData: { x: 6, y: 6, w: 6, h: 6, i: 2 },
        panelIndex: '2',
        type: 'visualization',
        id: '456',
        version: '7.0.0',
      }
    },
    getEmbeddableHandler: () => getEmbeddableHandlerMock(),
    getContainerApi: () => getContainerApiMock(),
    onPanelUpdated: () => {},
    useMargins: true,
  };
  return Object.assign(defaultTestProps, props);
}

beforeAll(() => {
  // sizeme detects the width to be 0 in our test environment. noPlaceholder will mean that the grid contents will
  // get rendered even when width is 0, which will improve our tests.
  sizeMe.noPlaceholders = true;
});

afterAll(() => {
  sizeMe.noPlaceholders = false;
});

test('renders DashboardGrid', () => {
  const component = shallow(<DashboardGrid {...getProps()} />);
  expect(component).toMatchSnapshot();
  const panelElements = component.find('Connect(DashboardPanel)');
  expect(panelElements.length).toBe(2);
});

test('renders DashboardGrid with no visualizations', () => {
  const component = shallow(<DashboardGrid {...getProps({ panels: {} })} />);
  expect(component).toMatchSnapshot();
});

