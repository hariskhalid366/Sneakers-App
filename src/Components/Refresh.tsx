// components/ScrollToRefresh.tsx

import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollViewProps} from 'react-native';

interface ScrollToRefreshProps extends ScrollViewProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

const ScrollToRefresh: React.FC<ScrollToRefreshProps> = ({
  onRefresh,
  children,
  ...rest
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return React.cloneElement(children as any, {
    refreshControl: (
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    ),
    ...rest,
  });
};

export default ScrollToRefresh;
