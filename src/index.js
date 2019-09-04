
import React, {Component} from 'react';

import Dropdown from './dropdown.js';
import SelectPanel from './select-panel.js';
import getString from './get-string.js';
import SelectItem from './select-item.js';

class MultiSelect extends Component {
    static defaultProps = {
        hasSelectAll: true,
        shouldToggleOnHover: false,
    }

    getSelectedText() {
        const {options, selected} = this.props;

        const selectedOptions = selected
            .map(s => options.find(o => o.value === s));

        const selectedLabels = selectedOptions.map(s => s ? s.label : "");

        return selectedLabels.join(", ");
    }

    renderHeader() {
        const {
            options,
            selected,
            valueRenderer,
            overrideStrings,
        } = this.props;

        const noneSelected = selected.length === 0;
        const allSelected = selected.length === options.length;

        const customText = valueRenderer && valueRenderer(selected, options);

        if (noneSelected) {
            return <span style={styles.noneSelected}>
                {customText || getString("selectSomeItems", overrideStrings)}
            </span>;
        }

        if (customText) {
            return <span>{customText}</span>;
        }

        return <span>
            {allSelected
                ? getString("allItemsAreSelected", overrideStrings)
                : this.getSelectedText()
            }
        </span>;
    }

    handleSelectedChanged = (selected) => {
        const {onSelectedChanged, disabled} = this.props;

        if (disabled) return;

        if (onSelectedChanged) {
            onSelectedChanged(selected);
        }
    };

    handleClearSelected = () => {
      const { onClearSelected } = this.props;

      if(onClearSelected) onClearSelected();
    };

    render() {
        const {
            ItemRenderer,
            options,
            selected,
            selectAllLabel,
            isLoading,
            disabled,
            disableSearch,
            filterOptions,
            shouldToggleOnHover,
            hasSelectAll,
            overrideStrings,
            labelledBy,
        } = this.props;

        return <div className="multi-select">
            <Dropdown
                isLoading={isLoading}
                contentComponent={SelectPanel}
                shouldToggleOnHover={shouldToggleOnHover}
                onClearSelected={this.handleClearSelected}
                contentProps={{
                    ItemRenderer,
                    options,
                    selected,
                    hasSelectAll,
                    selectAllLabel,
                    onSelectedChanged: this.handleSelectedChanged,
                    disabled,
                    disableSearch,
                    filterOptions,
                    overrideStrings,
                }}
                disabled={disabled}
                labelledBy={labelledBy}
            >
                {this.renderHeader()}
            </Dropdown>
        </div>;
    }
}

const styles = {
    noneSelected: {
        color: "#aaa",
    },
};

export default MultiSelect;
export {Dropdown, SelectPanel, SelectItem};