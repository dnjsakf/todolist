/* React */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

/* GraphQL */
import { useQuery } from '@apollo/react-hooks';
import CommonCodeQuery from 'GraphQL/Query/Common/CommonCode';

/* Materialize */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

/* Components */
import CommonCodeSelect from './../CommonCodeSelect';

/* Another Modules */
import clsx from 'clsx';

/* Materialize Styles */
const useStyles = makeStyles(( theme ) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    outlineStyle: "auto"
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedItem = ( props )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();

  return (
    <ListItem button className={ classes.nested }>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={ props.label } />
    </ListItem>
  )
}

const HierarchyItem = ( props )=>{
  /* Props */
  const { children, className, ...rest } = props;

  /* State */
  const classes = useStyles();
  const [open, setOpen] = useState( false );

  const handleClick = useCallback((event)=>{
    setOpen(!open);
  }, [ open ]);

  return (
    <>
      <ListItem button onClick={ handleClick }>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={ props.label } />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { children }
        </List>
      </Collapse>
    </>
  )
}

/* Component */
const HierarchySelect = ( props )=>{
  /* Props */
  const { className, ...rest } = props;

  /* State */
  const classes = useStyles();

  const { loading, error, data, fetchMore } = useQuery(
    CommonCodeQuery.GET_COMMON_CODE_LIST, {
      skip: !props.code,
      variables: {
        code: props.code,
        order: [
          "depth"
        ]
      },
      onError: (error)=>{
        console.groupCollapsed("["+props.name.toUpperCase()+"][error]");
        console.error(error);
        console.group("["+props.name.toUpperCase()+"][error]");
      },
      onCompleted: (data)=>{
        console.log("["+props.name.toUpperCase()+"][onCompleted]", data);
      }
    }
  );

  /* Handler: Handle when selectd option. */
  const handleChange = useCallback((event, depth)=>{
    const selected = event.target.value;
    console.log( selected, depth );
    
    fetchMore({
      variables: {
        code: selected,
        order: [
          "depth"
        ]
      },
      updateQuery: ( prev, { fetchMoreResult: { common_code_list } })=>{
        if( common_code_list && common_code_list.length === 0 || common_code_list[0].sub_codes.length === 0 ) return prev;
        return Object.assign({}, prev, {
          common_code_list: [
            ...prev.common_code_list,
            ...common_code_list
          ]
        })
      }
    });

    return event;
  }, [ fetchMore ]);
  
  /* Check Render */
  if( loading ) return <span>Data Loadding...</span>;
  if( error ) return null;
  if( !data ) return <span>No Data</span>;

  const { common_code_list: codes } = data;

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={ classes.root }
    >
    {
      codes && codes.map(( code )=>(
        <HierarchyItem 
          key={ code.id }
          label={ code.code_name }
        >
        {
          code.sub_codes.map(( sub_code )=>(
            <NestedItem
              key={ sub_code.id } 
              label={ sub_code.code_name }
            />
          ))
        }
        </HierarchyItem>
      ))
    }
    </List>
  )
}

HierarchySelect.propTypes = {
  control: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,

  label: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.string,

  data: PropTypes.shape({
    code: PropTypes.string.isRequired,
    code_name: PropTypes.string.isRequired,
    sub_codes: PropTypes.array.isRequired,
  }),
}

export default HierarchySelect;