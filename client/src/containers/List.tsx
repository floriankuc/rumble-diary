import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getItems, deleteItem } from '../actions/item/itemActions';
import { APP_ROUTES } from '../routes';
import Chart from '../components/Chart';
import List from '../components/List';
import history from '../routes/history';
import { AppState } from '../reducers';
import { Night } from '../entities/Night';
import { CircularProgress } from '@mui/material';
import EmptyState from '../components/EmptyState';

type PropsFromRedux = ConnectedProps<typeof connector>;
class ListContainer extends React.Component<PropsFromRedux> {
  componentDidMount(): void {
    if (this.props.authState.user && this.props.authState.user.id) {
      this.props.getItems();
    }
  }

  componentDidUpdate(prevProps: PropsFromRedux): void {
    if (
      this.props.authState.user &&
      this.props.authState.user.id &&
      (prevProps.authState.user !== this.props.authState.user || prevProps.itemState.success !== this.props.itemState.success)
    ) {
      this.props.getItems();
    }
  }

  onDeleteClick = (id: string): void => {
    this.props.deleteItem(id);
  };

  navigateToNightShow = (id: string): void => history.push(APP_ROUTES.show.replace(':id', id));

  transformItemsForChartDisplay = (items: Night[]): Night[] => {
    return items.map((night) => ({ ...night, duration: night.duration / 60 }));
  };

  renderList = (items: Night[]): ReactElement => {
    return <List onDeleteClick={this.onDeleteClick} onItemClick={this.navigateToNightShow} items={items} />;
  };

  render(): ReactElement {
    if (this.props.itemState.loading) {
      return <CircularProgress />;
    } else if (this.props.itemState.items.length === 0 && !this.props.itemState.loading && this.props.itemState.success) {
      return <EmptyState />;
    } else {
      return this.props.itemState.success && this.props.itemState.items ? (
        <>
          <Chart data={this.transformItemsForChartDisplay(this.props.itemState.items)} onBarClick={this.navigateToNightShow} />
          {this.renderList(this.props.itemState.items)}
        </>
      ) : (
        <></>
      );
    }
  }
}

const mapStateToProps = ({ itemState, authState }: AppState): Omit<AppState, 'errorState'> => ({
  itemState,
  authState,
});

const connector = connect(mapStateToProps, { getItems, deleteItem });

export default connector(ListContainer);
