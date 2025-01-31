import React, {Component} from 'react';
import clearIcon from "../fields/DateTimeControl/clear_input.png";

class Dropdown extends Component {
    state = {
        expanded: false,
        hasFocus: false,
    }

    componentWillUpdate() {
        document.addEventListener('touchstart', this.handleDocumentClick);
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('touchstart', this.handleDocumentClick);
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    wrapper = {}

    handleDocumentClick = (event) => {
        if (this.wrapper && !this.wrapper.contains(event.target)) {
            this.setState({expanded: false});
        }
    }

    handleKeyDown = (e) => {
        switch (e.which) {
            case 27: // Escape
                this.toggleExpanded(false);
                break;
            case 38: // Up Arrow
                this.toggleExpanded(false);
                break;
            case 13: // Enter Key
            case 32: // Space
            case 40: // Down Arrow
                this.toggleExpanded(true);
                break;
            default:
                return;
        }

        e.preventDefault();
    }

    handleFocus = (e) => {
        const {hasFocus} = this.state;

        if (e.target === this.wrapper && !hasFocus) {
            this.setState({hasFocus: true});
        }
    }

    handleBlur = (e) => {
        const {hasFocus} = this.state;

        if (hasFocus) {
            this.setState({hasFocus: false});
        }
    }

    handleMouseEnter = (e) => {
        this.handleHover(true);
    }

    handleMouseLeave = (e) => {
        this.handleHover(false);
    }

    handleHover = (toggleExpanded) => {
        const {shouldToggleOnHover} = this.props;

        if (shouldToggleOnHover) {
            this.toggleExpanded(toggleExpanded);
        }
    }

    toggleExpanded = (value) => {
        const {isLoading} = this.props;
        const {expanded} = this.state;

        if (isLoading) {
            return;
        }

        const newExpanded = value === undefined ? !expanded : !!value;

        this.setState({expanded: newExpanded});

        if (!newExpanded && this.wrapper) {
            this.wrapper.focus();
        }
    }

    renderPanel() {
        const {contentComponent: ContentComponent, contentProps} = this.props;

        return <div
            className="dropdown-content"
            style={styles.panelContainer}
        >
            <ContentComponent {...contentProps} />
        </div>;
    }

    clearSelectedValues = () => {
        const {onClearSelected} = this.props;
        if(onClearSelected) onClearSelected();
    }

    render() {
        const {expanded, hasFocus} = this.state;
        const {children, isLoading, disabled, labelledBy, contentProps: {selected}} = this.props;

        const expandedHeaderStyle = expanded
            ? styles.dropdownHeaderExpanded
            : undefined;

        const focusedHeaderStyle = hasFocus
            ? styles.dropdownHeaderFocused
            : undefined;

        const arrowStyle = expanded
            ? styles.dropdownArrowUp
            : styles.dropdownArrowDown;

        const focusedArrowStyle = hasFocus
            ? styles.dropdownArrowDownFocused
            : undefined;

        const headingStyle = {
            ...styles.dropdownChildren,
            ...(disabled ? styles.disabledDropdownChildren : {}),
        };

        return <div
            className="dropdown"
            tabIndex="0"
            role="combobox"
            aria-labelledby={labelledBy}
            aria-expanded={expanded}
            aria-readonly="true"
            aria-disabled={disabled}
            style={styles.dropdownContainer}
            ref={ref => this.wrapper = ref}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
        >
            <div
                className="dropdown-heading"
                style={{
                    ...styles.dropdownHeader,
                    ...expandedHeaderStyle,
                    ...focusedHeaderStyle,
                }}
                onClick={() => this.toggleExpanded()}
            >
                <span
                    className="dropdown-heading-value"
                    style={headingStyle}
                >
                    {children}
                </span>
            </div>
            <div>
               <span
                   className="dropdown-heading-loading-container"
                   style={styles.loadingContainer}
               >
                    {
                        selected.length > 0 &&
                        <img src={clearIcon} id={"date_time_input_img"} onClick={this.clearSelectedValues}/>
                    }
                </span>
            </div>
            {expanded && this.renderPanel()}
        </div>;
    }
}

const focusColor = '#78c008';

const styles = {
    dropdownArrow: {
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 25,
        paddingRight: 5,
    },
    dropdownArrowDown: {
        boxSizing: 'border-box',
        borderColor: '#999 transparent transparent',
        borderStyle: 'solid',
        borderWidth: '5px 5px 2.5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative',
    },
    dropdownArrowDownFocused: {
        borderColor: `${focusColor} transparent transparent`,
    },
    dropdownArrowUp: {
        boxSizing: 'border-box',
        top: '-2px',
        borderColor: 'transparent transparent #999',
        borderStyle: 'solid',
        borderWidth: '0px 5px 5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative',
    },
    dropdownChildren: {
        boxSizing: 'border-box',
        bottom: 0,
        color: '#333',
        left: 0,
        lineHeight: '34px',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        maxWidth: '95%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    disabledDropdownChildren: {
        opacity: 0.5,
    },
    dropdownContainer: {
        position: 'relative',
        boxSizing: 'border-box',
        outline: 'none',
    },
    dropdownHeader: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        borderColor: '#d9d9d9 #ccc #b3b3b3',
        borderRadius: 4,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        border: '1px solid #ccc',
        color: '#333',
        cursor: 'default',
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: 36,
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    dropdownHeaderFocused: {
        borderColor: focusColor,
        boxShadow: 'none',
    },
    dropdownHeaderExpanded: {
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
    },
    loadingContainer: {
        cursor: 'pointer',
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '16px',
    },
    panelContainer: {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderTopColor: '#e6e6e6',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
        boxSizing: 'border-box',
        marginTop: '-1px',
        maxHeight: '300px',
        position: 'absolute',
        top: '100%',
        width: '100%',
        zIndex: 1,
        overflowY: 'auto',
    },
};

export default Dropdown;
