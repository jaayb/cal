# Use the official Bun image
#FROM oven/bun:edge
FROM oven/bun:latest


# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies and build the project
RUN bun install
RUN bun run build

# Expose the port and start the server
EXPOSE 3000
CMD ["bun", "run", "start"]
