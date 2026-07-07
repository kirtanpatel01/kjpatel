"use client";

import React from "react";
import { CodeShowcase } from "@/components/stage";
import { SectionContainer } from "@/components/responsive-wrappers";
import { sidebarTocCode, sidebarTocFiles } from "./data";
// import { sidebarTocFiles, sidebarTocCode } from "./data";

export function SidebarTOCContent() {
  return (
    <div className="flex flex-col relative w-full">
      <SectionContainer className="w-full p-4">
        <CodeShowcase
          fileData={sidebarTocFiles}
          codeMapping={sidebarTocCode}
          previewComponent={
            <div className="">
              {/* TODO: Render actual component */}
            </div>
          }
          defaultFilePath="components/sidebar-toc.tsx"
          defaultFileNode={{ name: "sidebar-toc.tsx", type: "file" }}
          isMultiFile={false}
        />
      </SectionContainer>
    </div>
  );
}
