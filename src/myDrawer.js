import React,{ useState, useEffect }  from 'react';
import { Drawer,Button,ButtonToolbar } from 'rsuite';

function MyDrawer  (props)  {
    const [myDrawerState, setmyDrawerState] = useState(
        {
            show: false
        }
    );

    useEffect(() => {
        setmyDrawerState({
            show: props.drawSate
          });
      }, []);


    function close() {
        setmyDrawerState({
          show: false
        });
      };  
    
  
  
    return (
        <div>
        <ButtonToolbar>
          <Button onClick={()=>close()}>Open</Button>
        </ButtonToolbar>
        <Drawer
          show={myDrawerState.show}
          onHide={()=>close()}
        >
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>           
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={()=>close()} appearance="primary">Confirm</Button>
            <Button onClick={()=>close()} appearance="subtle">Cancel</Button>
          </Drawer.Footer>
        </Drawer>
      </div>
      );
  }

export default MyDrawer;
