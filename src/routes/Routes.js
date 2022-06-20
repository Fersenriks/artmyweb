import React, { Suspense } from 'react';

import { Pages } from './Pages';
import { Spin } from 'antd';

import { Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Suspense fallback={<Spin className='spin' size='large' />}>
      <Switch>
        {Pages.map((item, index) => (
          <Route key={index} {...item} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
