import { css } from 'styled-components';

export const MantineReactTableOveride = css`
  table.mrt-table.nvt-Table-table {
    --header-mrt_row_expand-size: 0px !important;
    --col-mrt_row_expand-size: 0px !important;
    --header-mrt_row_select-size: 0px !important;
    --col-mrt_row_select-size: 0px !important;
  }

  .nvt-Table-table .nvt-Table-tr:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.BORDER_PRIMARY};
  }

  .nvt-Table-tr:hover {
    box-shadow: ${(props) => props.theme.shadows.SHADOW};

    .row-actions {
      display: flex;
    }

    .nvt-Table-td {
      background-color: ${(props) => props.theme.colors.HOVER_PRIMARY} !important;
    }
  }

  .nvt-Table-td,
  .nvt-Table-th {
    font-size: 1.6rem;
  }

  .mrt-bottom-toolbar {
    height: 6.4rem;
  }

  .mrt-table-paper {
    border-radius: 0;
    border-right: none;
    border-left: none;
    border-bottom: none;
  }

  .nvt-Table-td:has(.mrt-expand-button[style*='--mrt-row-depth: 1']) {
    /* ẩn expand icon menu con */
    .mrt-expand-button[style*='--mrt-row-depth: 1'] {
      --mrt-row-depth: 0 !important;

      .nvt-ActionIcon-icon {
        display: none;
      }
    }

    /* Chỉ dịch vào td đầu tiên */
    & + .nvt-Table-td {
      padding-left: 3.2rem;
    }
  }
`;
