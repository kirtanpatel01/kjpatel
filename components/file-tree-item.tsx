import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

interface FileTreeItemProps {
  node: FileNode;
  depth?: number;
  parentPath?: string;
  selectedPath: string | null;
  onSelect: (node: FileNode, path: string) => void;
}

function FileTreeItem({
  node,
  depth = 0,
  parentPath = "",
  selectedPath,
  onSelect,
}: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";

  // Cleanly compute the full logical path
  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isSelected = selectedPath === currentPath;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(node, currentPath);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 pr-4 cursor-default transition-colors text-sm",
          isSelected
            ? "bg-secondary/80 text-foreground border-r border-primary font-medium"
            : "hover:bg-secondary/40 text-muted-foreground hover:text-foreground",
        )}
        style={{ paddingLeft: `${depth * 1 + 1}rem` }}
        onClick={handleClick}
      >
        {isFolder ? (
          <>
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <Folder size={14} className="text-blue-400 fill-blue-400/20" />
          </>
        ) : (
          <>
            <div className="w-[14px]" />
            <File
              size={14}
              className={cn(
                isSelected
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-70",
              )}
            />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {isFolder && isOpen && node.children && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <FileTreeItem
              key={child.name}
              node={child}
              depth={depth + 1}
              parentPath={currentPath}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default FileTreeItem;
