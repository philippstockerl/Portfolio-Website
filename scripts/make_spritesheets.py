#!/usr/bin/env python3
import argparse
import json
import math
import os
import subprocess
import sys


def run(cmd):
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "Command failed")
    return result.stdout.strip()


def ffprobe_video_info(path):
    wh = run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height",
        "-of", "csv=p=0:s=x", path
    ])
    dur = run([
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=nk=1:nw=1", path
    ])
    try:
        w_str, h_str = wh.split("x")
        width = int(w_str)
        height = int(h_str)
    except Exception:
        raise RuntimeError(f"Could not parse width/height from ffprobe: {wh}")
    try:
        duration = float(dur)
    except Exception:
        raise RuntimeError(f"Could not parse duration from ffprobe: {dur}")
    return width, height, duration


def best_grid(total_frames, src_w, src_h, max_size):
    best = None
    for cols in range(1, total_frames + 1):
        rows = math.ceil(total_frames / cols)
        scale = min(max_size / (cols * src_w), max_size / (rows * src_h))
        if scale <= 0:
            continue
        out_w = int((src_w * scale) // 2 * 2)
        out_h = int((src_h * scale) // 2 * 2)
        if out_w <= 0 or out_h <= 0:
            continue
        if out_w * cols > max_size or out_h * rows > max_size:
            continue
        waste = cols * rows - total_frames
        score = (scale, -waste, -abs(cols - rows))
        if best is None or score > best["score"]:
            best = {
                "cols": cols,
                "rows": rows,
                "out_w": out_w,
                "out_h": out_h,
                "scale": scale,
                "waste": waste,
                "score": score
            }
    return best


def make_sheet(input_path, out_dir, base, fps, max_size):
    src_w, src_h, duration = ffprobe_video_info(input_path)
    total_frames = max(1, int(math.ceil(duration * fps)))
    grid = best_grid(total_frames, src_w, src_h, max_size)
    if not grid:
        raise RuntimeError("Could not find a valid grid/scale.")

    cols = grid["cols"]
    rows = grid["rows"]
    out_w = grid["out_w"]
    out_h = grid["out_h"]

    out_name = f"{base}_{max_size}px_{fps}fps_{cols}x{rows}.png"
    out_path = os.path.join(out_dir, out_name)

    vf = f"fps={fps},scale={out_w}:{out_h}:flags=lanczos,format=rgba,tile={cols}x{rows}"
    cmd = [
        "ffmpeg", "-y", "-i", input_path,
        "-vf", vf, "-frames:v", "1", "-update", "1", out_path
    ]
    subprocess.run(cmd, check=True)

    meta = {
        "input": input_path,
        "duration": duration,
        "fps": fps,
        "total_frames": total_frames,
        "cols": cols,
        "rows": rows,
        "frame_width": out_w,
        "frame_height": out_h,
        "sheet_size": [out_w * cols, out_h * rows],
        "sheet_path": out_path
    }
    return meta


DEFAULT_INPUT = "media/videos/BudgetedRobustManimDark/1080p60/Formulation.webm"


def main():
    parser = argparse.ArgumentParser(description="Generate 2048@30 and 4096@60 sprite sheets.")
    parser.add_argument("input", nargs="?", help="Input video (mp4/webm)")
    parser.add_argument("--out-dir", default="media/sprites", help="Output directory")
    parser.add_argument("--base", default=None, help="Base output name (default: input filename)")
    args = parser.parse_args()

    input_path = args.input or DEFAULT_INPUT
    if not input_path:
        print("No input provided and DEFAULT_INPUT is empty.", file=sys.stderr)
        sys.exit(1)
    if not os.path.exists(input_path):
        print(f"Input not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    out_dir = args.out_dir
    os.makedirs(out_dir, exist_ok=True)

    base = args.base
    if not base:
        base = os.path.splitext(os.path.basename(input_path))[0]

    results = []
    results.append(make_sheet(input_path, out_dir, base, fps=30, max_size=4096))


    meta_path = os.path.join(out_dir, f"{base}_spritesheets.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print("Generated:")
    for r in results:
        print(f"- {r['sheet_path']} ({r['cols']}x{r['rows']}, frame {r['frame_width']}x{r['frame_height']})")
    print(f"Metadata: {meta_path}")

    print("\nAssetPresets snippets (copy/paste and adjust size/pos/rot/id):")
    for r in results:
        label = f"{r['fps']}fps {r['sheet_size'][0]}x{r['sheet_size'][1]}"
        print(f"\n// {label}")
        print("{")
        print("  id: 'sprite-id',")
        print("  type: 'sprite',")
        print(f"  src: '{r['sheet_path']}',")
        print(f"  cols: {r['cols']},")
        print(f"  rows: {r['rows']},")
        print(f"  fps: {r['fps']},")
        print(f"  frameCount: {r['total_frames']},")
        print("  loop: true,")
        print("  size: [90, 50],")
        print("  pos: [0, 0, 0.12],")
        print("  rot: [0, 0, 0],")
        print("  side: 'double',")
        print("  opacity: 1")
        print("}")


if __name__ == "__main__":
    main()
