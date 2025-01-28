import React from 'react'
import OrderDetail from '../../components/orders/OrderDetail'
import PropTypes from 'prop-types';

function OrderEditPage({ editButton }) { // Receive editButton as a prop
  return (
    <div>
      <OrderDetail editButton={editButton} />  {/* Pass editButton down */}
    </div>
  )
}

OrderDetail.propTypes = {
    editButton: PropTypes.bool, // Ensure editButton is always a boolean
  };
  
export default OrderEditPage