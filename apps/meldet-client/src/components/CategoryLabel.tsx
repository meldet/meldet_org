import * as React from "react";
import { Category } from "@prisma/client";
import { Chip, Tooltip } from "@mui/material";

export default function CategoryLabel({
  description,
  name,
  onDelete,
  onClick,
}: Category & { onDelete?: (e: any) => void; onClick?: (e: any) => void }) {
  return (
    <Tooltip title={description}>
      <Chip
        label={name}
        onClick={onClick}
        onDelete={onDelete}
      />
    </Tooltip>
  );
}
