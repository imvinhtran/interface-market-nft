import merge from 'lodash/merge';
import { Theme } from '@mui/material';
import Card from './Card';
import Chip from './Chip';
import Tabs from './Tabs';
import Menu from './Menu';
import Grid from './Grid';
import Link from './Link';
import Lists from './Lists';
import Table from './Table';
import Badge from './Badge';
import Paper from './Paper';
import Input from './Input';
import Radio from './Radio';
import Dialog from './Dialog';
import Avatar from './Avatar';
import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import Select from './Select';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Stepper from './Stepper';
import Pickers from './Pickers';
import DataGrid from './DataGrid';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Snackbar from './Snackbar';
import Progress from './Progress';
import Timeline from './Timeline';
import Checkbox from './Checkbox';
import Container from './Container';
import Typography from './Typography';
import Pagination from './Pagination';
import IconButton from './IconButton';
import Breadcrumbs from './Breadcrumbs';
import ButtonGroup from './ButtonGroup';
import Autocomplete from './Autocomplete';
import ToggleButton from './ToggleButton';
import ControlLabel from './ControlLabel';
import LoadingButton from './LoadingButton';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
	return merge(
		Tabs(theme),
		Chip(theme),
		Card(theme),
		Menu(theme),
		Grid(theme),
		Link(theme),
		Input(theme),
		Radio(theme),
		Badge(theme),
		Lists(theme),
		Table(theme),
		Paper(theme),
		Switch(theme),
		Select(theme),
		Button(theme),
		Dialog(theme),
		Avatar(theme),
		Slider(theme),
		Pickers(theme),
		Stepper(theme),
		Tooltip(theme),
		Popover(theme),
		SvgIcon(theme),
		Checkbox(theme),
		DataGrid(theme),
		Skeleton(theme),
		Timeline(theme),
		Backdrop(theme),
		Snackbar(theme),
		Progress(theme),
		Container(theme),
		IconButton(theme),
		Typography(theme),
		Pagination(theme),
		ButtonGroup(theme),
		Breadcrumbs(theme),
		Autocomplete(theme),
		ControlLabel(theme),
		ToggleButton(theme),
		LoadingButton(theme)
	);
}
