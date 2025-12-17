import {render, screen, cleanup} from "@testing-library/react"
import OwnDropItem from "../components/OwnDropItem"
import {describe, it, expect, vi, afterEach} from "vitest"
import {userEvent} from "@testing-library/user-event"
import "@testing-library/jest-dom/vitest"

afterEach(() => {
  cleanup()
})

describe("OwnDropItem", () => {

  it("renders a dropdown item with item name", () => {
    render(<OwnDropItem item="Test item" func={() => {}} />)
    expect(screen.getByText("Test item")).toBeInTheDocument()
  })

  it("calls func(item) when clicked", async () => {
    const fn = vi.fn()

    render(<OwnDropItem item={"Test-item"} func={fn} />)
    const testItem = screen.getByText("Test-item")

    await userEvent.click(testItem)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith("Test-item")
  })
})