"use client";

import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DropdownList = ({ data, onSelect, value = "" }) => {
  const [selected, setSelected] = useState(value || "Select");

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleMenuClick = ({ key }) => {
    const selectedItem = data.find((item) => item.key === key);
    const label = selectedItem?.label || "Select";
    setSelected(label);
    if (onSelect) onSelect(label);
  };

  return (
    <Dropdown
      menu={{ items: data, onClick: handleMenuClick }}
      trigger={["click"]}
      arrow={false}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
    >
      <a onClick={(e) => e.preventDefault()} className="w-full block">
        <Space className="justify-between w-full">
          {selected}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownList;
