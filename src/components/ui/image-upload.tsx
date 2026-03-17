
"use client";

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, FileWarning, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onUpload?: (file: File) => void;
  className?: string;
  label?: string;
  description?: string;
  maxSizeMB?: number;
}

export function ImageUpload({ 
  onUpload, 
  className, 
  label = "Upload Image", 
  description = "Drag and drop or click to browse",
  maxSizeMB = 5 
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file (JPG, PNG, WebP)");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (onUpload) {
      onUpload(file);
    }
  }, [maxSizeMB, onUpload]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative min-h-[200px] rounded-[2rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer group overflow-hidden",
          dragActive 
            ? "border-primary bg-primary/10 scale-[1.02]" 
            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
          preview ? "border-solid border-primary/40 bg-black/40" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        <AnimatePresence mode="wait">
          {!preview ? (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-black text-white uppercase tracking-tight">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="flex items-center justify-center gap-4 pt-2">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Supports: JPG, PNG, WEBP</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Max: {maxSizeMB}MB</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full animate-in fade-in zoom-in duration-300">
              <div className="absolute top-0 right-0 z-10 p-2">
                <button 
                  onClick={clearPreview}
                  className="bg-black/80 text-white p-2 rounded-full hover:bg-red-500 transition-colors border border-white/10 shadow-2xl"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-64 object-contain rounded-xl"
              />
              <div className="mt-4 flex items-center justify-center gap-2 text-green-500 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" /> Image Ready for Processing
              </div>
            </div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold animate-shake">
            <FileWarning className="w-4 h-4" /> {error}
          </div>
        )}

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/5 rounded-tl-[2rem]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/5 rounded-tr-[2rem]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5 rounded-bl-[2rem]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/5 rounded-br-[2rem]" />
      </div>
    </div>
  );
}
