
import React, {Component} from 'react';

class DefaultItemRenderer extends Component {
    render() {
        const {checked, option, onClick, disabled} = this.props;

        const style = {
            ...styles.label,
            ...(disabled ? styles.labelDisabled : undefined),
        };

        return <div className="item-renderer">
            <div>
                <input
                    type="checkbox"
                    onChange={onClick}
                    checked={checked}
                    tabIndex="-1"
                    disabled={disabled}
                />
            </div>
            <div>
                <span style={style}>{option.label}</span>
            </div>
        </div>;
    }
}

class SelectItem extends Component {
    static defaultProps = {
        ItemRenderer: DefaultItemRenderer,
    }

    state = {
        hovered: false,
    }

    componentDidMount() {
        this.updateFocus();
    }

    componentDidUpdate() {
        this.updateFocus();
    }

    itemRef = null;

    onChecked = (e) => {
        const {onSelectionChanged} = this.props;
        const {checked} = e.target;

        onSelectionChanged(checked);
    }

    toggleChecked = () => {
        const {checked, onSelectionChanged} = this.props;
        onSelectionChanged(!checked);
    }

    handleClick = (e) => {
        const {onClick} = this.props;
        this.toggleChecked();
        onClick(e);
    }

    updateFocus() {
        const {focused} = this.props;

        if (focused && this.itemRef) {
            this.itemRef.focus();
        }
    }

    handleKeyDown = (e) => {
        switch (e.which) {
            case 13: // Enter
            case 32: // Space
                this.toggleChecked();
                break;
            default:
                return;
        }

        e.preventDefault();
    }

    render() {
        const {ItemRenderer, option, checked, focused, disabled} = this.props;
        const {hovered} = this.state;

        const focusStyle = (focused || hovered)
            ? styles.itemContainerHover
            : undefined;

        return <label
            className="select-item"
            role="option"
            aria-selected={checked}
            selected={checked}
            tabIndex="-1"
            style={{...styles.itemContainer, ...focusStyle}}
            ref={ref => this.itemRef = ref}
            onKeyDown={this.handleKeyDown}
            onMouseOver={() => this.setState({hovered: true})}
            onMouseOut={() => this.setState({hovered: false})}
        >
            <ItemRenderer
                option={option}
                checked={checked}
                onClick={this.handleClick}
                disabled={disabled}
            />
        </label>;
    }
}


const styles = {
    itemContainer: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 10px',
    },
    itemContainerHover: {
        backgroundColor: 'rgb(207, 226, 251)',
        border: '3px solid rgb(167, 202, 249)',
        outline: 0,
    },
    label: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderBottomRightRadius: '2px',
        borderTopRightRadius: '2px',
        cursor: 'default',
        wordBreak: 'break-word',
        paddingLeft: '5px'
    },
    labelDisabled: {
        opacity: 0.5,
    },
};

export default SelectItem;
