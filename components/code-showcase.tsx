'use client'

import React, { useState, useEffect } from 'react'
import FileTreeItem, { FileNode } from './file-tree-item'
import CodeBlock from './code-block'
import { Button } from './ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { FileCode2, FileJson, FileText, Copy, Check } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'

interface CodeShowcaseProps {
  fileData: FileNode[];
  codeMapping: Record<string, { code: string, language: string }>;
  previewComponent: React.ReactNode;
  defaultFilePath?: string;
  defaultFileNode?: FileNode;
}

function CodeShowcase({ 
  fileData, 
  codeMapping, 
  previewComponent,
  defaultFilePath,
  defaultFileNode
}: CodeShowcaseProps) {
  const [activeFile, setActiveFile] = useState<{node: FileNode, path: string} | null>(null);
  const [copied, setCopied] = useState(false);

  // Default selection if none
  useEffect(() => {
    if (defaultFilePath && defaultFileNode) {
      setActiveFile({ node: defaultFileNode, path: defaultFilePath });
    }
  }, [defaultFilePath, defaultFileNode]);

  const handleCopy = () => {
    if (!activeFile) return;
    const code = codeMapping[activeFile.path]?.code;
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Small helper to pick the right icon for the header path
  const getFileIcon = (name: string) => {
    if (name.endsWith(".json")) return <FileJson size={14} className="text-yellow-500/80" />;
    if (name.endsWith(".tsx") || name.endsWith(".ts")) return <FileCode2 size={14} className="text-blue-400" />;
    return <FileText size={14} className="text-muted-foreground/80" />;
  }

  const activeCodeData = activeFile ? codeMapping[activeFile.path] : null;

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <Tabs defaultValue='preview' className="h-[700px] flex flex-col">
        <TabsList className="">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className='flex-1 border border-border rounded-xl overflow-hidden bg-background'>
          {previewComponent}
        </TabsContent>
        <TabsContent value="code" className='flex-1 flex flex-col md:flex-row border border-border rounded-xl divide-y md:divide-y-0 md:divide-x divide-border overflow-hidden bg-background'>
          {/* Sidebar */}
          <div className='w-full md:w-64 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-border/10'>
            <div className='p-3 border-b text-xs font-bold uppercase tracking-widest text-muted-foreground bg-accent/5'>Files</div>

            <ScrollArea className="h-40 md:flex-1 py-1 [&>[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:hidden">
              {fileData.map((node) => (
                <FileTreeItem 
                  key={node.name} 
                  node={node} 
                  depth={0} 
                  selectedPath={activeFile?.path || null}
                  onSelect={(node, path) => setActiveFile({ node, path })}
                />
              ))}
            </ScrollArea>
          </div>
          {/* Code Section */}
          <div className='flex-1 flex flex-col bg-accent/2 overflow-hidden min-h-0'>
            <div className='p-2 border-b bg-background flex items-center justify-between text-xs text-muted-foreground '>
              {activeFile ? (
                <>
                  <div className="flex items-center gap-2.5 px-1 text-foreground/80 overflow-hidden">
                    {getFileIcon(activeFile.node.name)}
                    <span className="opacity-90 truncate">{activeFile.path}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon-xs" 
                    onClick={handleCopy}
                    className="hover:text-foreground shrink-0"
                    title="Copy code"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </Button>
                </>
              ) : (
                <span className="opacity-40 italic px-2 py-1">Select a file</span>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              {activeFile ? (
                activeCodeData ? (
                  <CodeBlock 
                    code={activeCodeData.code} 
                    language={activeCodeData.language} 
                  />
                ) : (
                  <div className="p-6 text-muted-foreground opacity-30 text-xs italic">
                    Source for {activeFile.path} not available.
                  </div>
                )
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground opacity-30 text-xs text-center p-12">
                  Pick a file to view code.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CodeShowcase
