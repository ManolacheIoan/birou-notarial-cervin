import { describe, expect, it, vi } from "vitest";
import { demoAdapter, getAdapter, httpAdapter } from "@/lib/appointment-adapter";

const data = {
  name: "Ana Pop",
  phone: "0722123456",
  email: "",
  service: "procura",
  serviceName: "Procuri",
  day: "2026-11-03",
  message: "",
  consent: true,
};

describe("adaptorul de programări", () => {
  it("fără endpoint: modul demo, nu trimite nimic", async () => {
    expect(getAdapter("").mode).toBe("demo");
    expect(await demoAdapter.send(data)).toEqual({ status: "not-sent" });
  });
  it("cu endpoint: POST JSON, fără câmpuri goale", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    const r = await httpAdapter("https://exemplu.test/f", fetchMock).send(data);
    expect(r).toEqual({ status: "sent" });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://exemplu.test/f");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ nume: "Ana Pop", serviciu: "Procuri" });
    expect(body).not.toHaveProperty("email");
  });
  it("erori de server și de rețea", async () => {
    const bad = vi.fn().mockResolvedValue(new Response("", { status: 500 }));
    expect((await httpAdapter("x", bad).send(data)).status).toBe("error");
    const down = vi.fn().mockRejectedValue(new TypeError("offline"));
    expect((await httpAdapter("x", down).send(data)).status).toBe("error");
  });
});
