"use client";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DropdownList = ({ data, onSelect }) => {
  const [selected, setSelected] = useState("Select location");

  const handleMenuClick = ({ key }) => {
    const selectedItem = data.find((item) => item.key === key);
    setSelected(selectedItem?.label || "Select location");
    if (onSelect) onSelect(selectedItem?.label);
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
